title: 'GelTip: A Finger-shaped Optical Tactile Sensor for Robotic Manipulation'
author: danfergo
tags:
  - touch
  - featured
categories: []
cover: cover.jpg
date: 2020-03-07 20:08:00
---
Sensing contacts throughout the entire finger is an highly valuable capability for a robots (and humans) when carrying manipulation tasks,  as  vision-based  sensing  often  suffers  from  occlusions  or inaccurate  estimations. Current tactile sensors suffer from one of two drawbacks: low resolution readings, or a limited contact measurement area. We propose a finger-shaped optical sensor that has the shape of a finger and can sense contacts on any location of its surface. Our experiments show that the sensor can effectively capture such contacts throughout its surface.

{% raw %}
<img width="100%" src="cover.jpg" title="The GelTip Optical Tactile Sensor" style="max-width:50rem; margin:3rem auto 1rem;"> 
{% endraw %}

In figure above a plastic strawberry is being grasped by a parallel gripper equipped with two of the proposed GelTip sensors, with the corresponding imprint highlighted in the obtained tactile image (in gray-scale). As it can be seen, the sensor clearly capture the strawberry texture.

## Materials
In the table bellow, the necessary STL files for 3D printing the GelTip sensor are provided. STL files are also provided for printing the 5 objects dataset and support mount, used in the Contact Localisation experiment. Please refer to the paper for more instructions on how to build the sensor or experiments details.

| DESCRIPTION           |  FILE    |
|-----------------------|:--------:|
| **3D printable (STL) files of the GelSight sensor and mold.** | ** [geltip2020_parts.zip](geltip2020_parts.zip) ** |
| **3D printable (STL) files of the objects and mount used in the contact localisation experiment.** | ** [objects_dataset.zip](objects_dataset.zip) ** |

## Sensor projective model 
We derive the protective function that maps pixels in the image space into points on the sensor surface, as illustrated in the picture below. The two shown rays intersect the sensor surface in the spherical region, in red, and the cylindrical region, in blue; and each ray intersects three relevant points: the frame of reference origin, a point in the sensor surface and the corresponding projected point in the image plane.

{% raw %}
<video width="600" height="300" controls>
  <source src="projective_model.mp4" type="video/mp4">
Your browser does not support the video tag.</video>
{% endraw %}

## Evaluation


{% raw %}
<video width="600" height="300" controls>
  <source src="exp_contact_detection.mp4" type="video/mp4">
Your browser does not support the video tag.</video>
{% endraw %}

Two GelTip sensors are installed on a robotic actuator and a 3D printed mount that holds a small 3D printed object placed on top of a wooden block. The actuator moves in small increments and collects tactile images annotated with the known contact positions. We then implement an image-subtraction based algorithm to localise such contacts in image space. Then, using the projective model the localised contact points are projected into world coordinates. The errors between the true and predicted positions, measured as the Euclidean distance, are then assessed.

{% raw %}
<video width="600" height="300" controls>
  <source src="exp_world_blocks.mp4" type="video/mp4">
Your browser does not support the video tag.</video>
{% endraw %}
To demonstrate the potential of all-around sensing, in the context of manipulation/grasping tasks a Blocks World is carried. The robot actuator moves row by row, attempting to grasp each block. Two different policies are analysed: one in which the robot grasps each block randomly, and another in which touch feedback is used to adjust the initially random grasp (the video above shows the latter). The experiment shows that when using touch feedback the robot grasps all the blocks successfully, even with the initial uncertainty.

For more information about the GelTip sensor, its fabrication process, and the executed experiments, checkout the papers referenced bellow.





### References
[^1]: Daniel Fernandes Gomes, Zhonglin Lin and Shan Luo, "Blocks World of Touch: Exploiting the advantages of all-around finger sensing in robot grasping", Frontiers in Robotics and AI 7 (2020). **[10.3389/frobt.2020.541661](http://doi.org/10.3389/frobt.2020.541661)**
[^2]: Daniel Fernandes Gomes, Zhonglin Lin and Shan Luo, "GelSight Simulation for Sim2Real Learning", ViTac Workshop ICRA 2020. **[paper](http://wordpress.csc.liv.ac.uk/smartlab/wp-content/uploads/sites/5/2020/05/ICRA2020ViTac_paper_5.pdf)**