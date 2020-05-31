title: 'GarmNet: Improving Global with Local Perception for Robotic Laundry Folding'
alias: garmnet/index.html
author: danfergo
tags:
  - featured
  - vision
categories: []
cover: cover.png
date: 2019-03-02 22:29:00
---
Developing autonomous assistants to help with domestic tasks is a vital topic in robotics research. Among these tasks, garment folding is one of them that is still far from being achieved mainly due to the large number of possible configurations that a crumpled piece of clothing may exhibit. Research has been done on either estimating the pose of the garment as a whole or detecting the landmarks for grasping separately. However, such works constrain the capability of the robots to perceive the states of the garment by limiting the representations for one single task. In this paper, we propose a novel end-to-end deep learning model named GarmNet that is able to simultaneously localize the garment and detect landmarks for grasping. The localization of the garment represents the global information for recognising the category of the garment, whereas the detection of landmarks can facilitate sub-sequent grasping actions. We train and evaluate our proposed GarmNet model using the CloPeMa Garment dataset that contains 3,330 images of different garment types in different poses. The experiments show that the inclusion of landmark detection (GarmNet-B) can largely improve the garment localization, with an error rate of 24.7% lower. Solutions as ours are important for robotics applications, as these offer scalable to many classes, memory and processing efficient solutions.


{% asset_img img_spacial_constraint.png "Spatial Constraint" %}


### References
[^1]: GarmNet: Improving Global with Local Perception for Robotic Laundry Folding, TAROS 2019, **[arxiv]([https://arxiv.org/abs/1907.00408])**
[^2]: Detecting garment and its landmarks MSc dissertation, 2017-07-18. **[UP Open Repository](https://hdl.handle.net/10216/107701)** 