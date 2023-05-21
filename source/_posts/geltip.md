title: 'GelTip: A Finger-shaped Optical Tactile Sensor for Robotic Manipulation'
author: danfergo
tags:
  - featured
  - touch
categories: []
cover: cover.gif
abstract: 'Touch is a vital sense for object manipulation. We propose a finger-shaped sensor that can sense high-resolution contacts on any location of its surface.'
authors: 
  - danfergo
  - zhonglin
  - shan
cite_this:
downloads:
    - title: GelSight sensor and mold
      description: 3D printable (STL) files
      btn: geltip2020_parts.zip
      href: geltip2020_parts.zip
    - title: Object set
      description: 3D printable (STL) files used in the contact localisation experiment. 
      btn: objects_dataset.zip
      href: objects_dataset.zip
date: 2020-03-07 20:08:00
---
Sensing contacts throughout the entire finger is an highly valuable capability for a robots (and humans) when carrying manipulation tasks,  as  vision-based  sensing  often  suffers  from  occlusions  or inaccurate  estimations. Current tactile sensors suffer from one of two drawbacks: low resolution readings, or a limited contact measurement area. We propose a finger-shaped optical sensor that has the shape of a finger and can sense contacts on any location of its surface. Our experiments show that the sensor can effectively capture such contacts throughout its surface.

{% embed_figure image cover.jpg  'A plastic strawberry is being grasped by a parallel gripper equipped with two of the proposed GelTip sensors, with the corresponding imprint highlighted in the obtained tactile image (in gray-scale). As it can be seen, the sensor clearly capture the strawberry texture.' %}


## Sensor projective model 
We derive the protective function that maps pixels in the image space into points on the sensor surface, as illustrated in the picture below. The two shown rays intersect the sensor surface in the spherical region, in red, and the cylindrical region, in blue; and each ray intersects three relevant points: the frame of reference origin, a point in the sensor surface and the corresponding projected point in the image plane.

{% embed_figure video projective_model.mp4  'some caption' %}





## Experiments

We evaluate our GelTip sensor from on two tasks. Firstly, we demonstrate that the tactile images captured by our sensor can be used to achieve contact localization. Secondly, we demonstrate the advantages of considering touch sensing in manipulation tasks, such as grasping.

Two GelTip sensors are installed on a robotic actuator and a 3D printed mount that holds a small 3D printed object placed on top of a wooden block. The actuator moves in small increments and collects tactile images annotated with the known contact positions. We then implement an image-subtraction based algorithm to localise such contacts in image space. Then, using the projective model the localised contact points are projected into world coordinates. The errors between the true and predicted positions, measured as the Euclidean distance, are then assessed.

{% embed_figure video exp_contact_detection.mp4  '' %}

To demonstrate the potential of all-around sensing, in the context of manipulation/grasping tasks a Blocks World is carried. The robot actuator moves row by row, attempting to grasp each block. Two different policies are analysed: one in which the robot grasps each block randomly, and another in which touch feedback is used to adjust the initially random grasp (the video above shows the latter). The experiment shows that when using touch feedback the robot grasps all the blocks successfully, even with the initial uncertainty.

For more information about the GelTip sensor, its fabrication process, and the executed experiments, checkout the papers referenced bellow.

{% embed_figure video exp_world_blocks.mp4  'some caption' %}

{% embed_figure youtube UNVPEaUVd0U  'Check out our presentation at the ICRA ViTac 2020 Workshop.' %}

## References
[^1]: Daniel Fernandes Gomes, Zhonglin Lin and Shan Luo, "Blocks World of Touch: Exploiting the advantages of all-around finger sensing in robot grasping", Frontiers in Robotics and AI 7 (2020). **[10.3389/frobt.2020.541661](http://doi.org/10.3389/frobt.2020.541661)**
[^2]: Daniel Fernandes Gomes, Zhonglin Lin and Shan Luo, "GelSight Simulation for Sim2Real Learning", ViTac Workshop ICRA 2020. **[paper](http://wordpress.csc.liv.ac.uk/smartlab/wp-content/uploads/sites/5/2020/05/ICRA2020ViTac_paper_5.pdf)**