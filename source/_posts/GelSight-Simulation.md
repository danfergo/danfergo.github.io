title: GelSight Simulation for Sim2Real Learning
alias: gelsight-simulation/index.html
author: danfergo
tags:
  - featured
  - touch
categories: []
date: 2019-05-20 23:55:00
cover: cover.png

---
Grasping and manipulation of objects are commonboth in domestic and industrial environments. Recent worksexploring learning based solutions have shown promising re-sults  on  robotic  manipulation  tasks.  One  efficient  approachfor training such learning agents is to train them within asimulated environment, followed by their deployment on realrobots (Sim2Real). Most current works leverage camera vision tofacilitate such manipulation tasks. However, camera vision mightbe significantly occluded by robot hands during the manipulation.Tactile sensing is another important sensing modality that offerscomplementary  information  to  vision  and  can  make  up  theinformation loss caused by the occlusion. However, the use oftactile sensing is restricted in theSim2Realresearch due tono simulated tactile sensors available in the current simulationplatforms. To mitigate the gap, we introduce a novel approach forsimulating a GelSight tactile sensor in the commonly used Gazebosimulator. Similar to the real GelSight sensor, the simulatedsensor can produce high-resolution images by an optical sensorfrom the interaction between the touched object and an opaquesoft membrane. It can indirectly sense forces, geometry, texture and other properties of the object and enables the research ofSim2Real learning with tactile sensing. Preliminary experiment results have shown that the simulated sensor could generate realistic outputs similar to ones captured by a real GelSight sensor. 

{% asset_img envs.png %}

{% asset_img samples.png %}

**This post will be updated soon with references for the conference publication, source code (ROS Packages & Simulation for Gazebo) and other materials (STL files).**


### References
[^1]: Daniel Fernandes Gomes, Achu Wilson and Shan Luo, "GelSight Simulation for Sim2Real Learning", ViTac Workshop ICRA 2019. **[paper](http://wordpress.csc.liv.ac.uk/smartlab/wp-content/uploads/sites/5/2019/06/ICRA2019ViTac_paper_8.pdf)**
