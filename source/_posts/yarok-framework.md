title: YAROK - Yet another robot framework
author: danfergo
tags:
  - featured
categories: []
cover: cover.jpg
authors:
  - danfergo
  - shan
code_url: https://github.com/danfergo/yarok
abstract: 'Programming robotics software is combersome, requiring orchestrating multiple complex parts. YAROK offers platform-independent composable components that bundle robot description and controller for wider reusability.'
date: 2022-10-06 23:45:00
---

The development of Robotics Software is a combersome task, often requiring the programming of multiple components for handling different sensors and actuators. Fortunately the adoption of software frameworks, namely the Robotic Operating System (ROS), has enabled the sharing of these components amongst practitioners, resulting in quicker prototpyings. Nonetheless, ROS is a complex framework, with a steep learning curve, requiring the understanding of the framework achitecture, messaging system, multiple programming languages, highly tied the operating system, etc. while, not supporting out-of-the-box more sophisticated simulators, such as MuJoCo -- of high interest to current Machine Learning/Robotics research. On the other hand, *MuJoCo*, which can be set-up and run from a single *Python* script, does not include many capabilities for modularity or integration with real world hardware. To address this gap, we introduce the *Yarok* framework. Using *Yarok* practitioners can describe components using an slightly extended MuJoCo markup language, that are directly represented as Python classes, and have full experimental setups in a few clear lines of code. Further, the low level interfaces, for each component, for interacting with the environment (MuJoCo, or real world), can be also written as Python classes, and are enabled by the framework, for the corresponding environment.  

{% embed_figure image cover.jpg %}



## The Component

The central concept in Yarok is the component. A Component is a Python annotated class that allows you to bundle together the component controller and template description (using extended MuJoCo MJCF). In the component, you can also define environment interfaces that, at runtime, depending on what enviroment yarok is running, override the environment-independent controller class.

{% codeblock lang:python %}
@component(
    tag="my-robot-arm",
    defaults={
        'interface_mjc': MyRobotArmMJC,
        'interface_hw': MyRobotArmHW,
    }
    template= ...
class MyComponent:
        ...
{% endcodeblock %}


## Composing components
Yarok allows you to easily compose complex robots using components of sensors and actuators. Bellow, we show how o include a custom gripper component onto your robot model, as well as nesting a sensor onto the gripper finger. Further, you're able to request the corresponding gripper and sensor instance controllers to be injected onto the robot controller. 

{% codeblock lang:python %}
from my_shared_components import MyGripper, MyTouchSensor

components=[
    MyGripper, MyTouchSensor
]
template="""
    <my-gripper name="gripper1">
        <my-sensor name="sensor1" parent="finger1_tip"></my-sensor>
    </my-gripper>
    ...
"""
class MyComponent:

    def __init__(gripper1: MyGripper, sensor1: MySensor):
        ...
{% endcodeblock %}


## Dynamic templates

Similarly to xacro in the Robotic Operating System (ROS), Yarok adds config variables and if/for statements to templates. See below how we defined a parameterizable tumble tower of blocks using these macros. Define the variables in the defaults section, and override it when running the platform.

{% codeblock lang:python %}
<for each='range(rows)' as='z'>
    <for each='range(cols)' as='x'>
        <body pos="
            ${0.5 + 0.082*x if z % 2 == 0 else 0.58}
            ${0.48 if z % 2 == 0 else 0.4 + 0.082*x}
            ${0.061*z}"
            euler="0 0 ${0 if z % 2 == 0 else 1.57}">
            <freejoint/>
            <geom class='tt-block'/>
        </body>
    </for>
</for>
{% endcodeblock %}

## MJC Interface


{% codeblock lang:python %}
from yarok import interface

@interface(
    defaults={
        'conf1': 'some_value'
    }
)
class MyGripperInterfaceMJC:
    def __init__(self, mjc: InterfaceMJC, config: ConfigBlock):
        self.conf1 = config['conf1'] 
        self.mjc = mjc # wraps MuJoCo Python API

    def move(q):
        self.q = q

    def step(): # called every update step
         # handles referencing/scope for multiple component instances
         current_q = self.interface.sensordata()
         self.mjc.set_ctrl('joint1', self.q)
        
         # for cameras, converts depth to meters
         rgb, depth = self.mjc.read_camera('camera1')

{% endcodeblock %}

## Running your environment

Once you have your components tree defined, you just wrap it onto a Platform object and run it. By default, Yarok runs on the simulation environment, loading MuJoCo interfaces, but you can also configure it to run on "real" environment, and it will load the real interfaces. This way, you can write your behaviours once and run them both in simulation and the real world. 

{% codeblock lang:python %}
from yarok import Platform, PlatformMJC

Platform.create({
    'world': MyExperimentWorld,
    'behaviour': SomeBehaviour,
    'defaults': {
        'environment': 'sim' # or 'real'
    },
    'environments': {
       'sim': {
            'platform': PlatformMJC,
            'components': {
                 '/gripper1': {
                     'serial_path': '/dev/ttyUSB0' 
                      # ... etc
                 }
            }
        }
    }
}).run()
{% endcodeblock %}

## Example
{% codeblock lang:python %}
<body euler="0 0 1.57" pos="-0.15 0.4 0.3">
    <ur5e name='arm'>
       <robotiq-2f85 name="gripper" parent="ee_link"> 
          <body parent="right_tip"
                pos="0.02 -0.017 0.053" 
                xyaxes="0 -1 0 1 0 0">
                <geltip name="left_geltip"/>
           </body>
           <body parent="left_tip"
                 pos="-0.02 -0.017 0.053" 
                 xyaxes="0 1 0 -1 0 0">
                <geltip name="right_geltip"/>
            </body>
        </robotiq-2f85> 
    </ur5e> 
</body>
{% endcodeblock %}

In this post we have just give you a quick glance at what you can do with Yarok, if you would like to learn more and getting started using it, visit the [project repository](https://github.com/danfergo/yarok) and start experimenting.