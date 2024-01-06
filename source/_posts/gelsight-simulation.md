title: GelSight Simulation for Sim2Real Learning
author: danfergo
tags:
  - featured
  - touch
categories: []
cover: cover.gif
abstract: Simulation accelerates and opens access to robotics research. We introduce a novel approach for simulating the GelSight tactile sensors in the commonly used simulators.
code_url: https://github.com/danfergo/gelsight_simulation
authors:
  - danfergo
  - tudor
  - achu
  - paolo
  - shan
cite_this: 
  - citation_type: article 
    citation_id: 9369877
    title: Generation of GelSight Tactile Images for Sim2Real Learning
    author: Daniel Fernandes Gomes and Paolo Paoletti and Shan Luo
    journal: IEEE Robotics and Automation Letters
    year: 2021
    volume: 6
    number: 2
    pages: 4177-4184
    doi: 10.1109/LRA.2021.3063925
  - citation_type: article
    citation_id: DBLP:journals/corr/abs-2112-01807
    author: Tudor Jianu and Daniel Fernandes Gomes and Shan Luo
    title: Reducing Tactile Sim2Real Domain Gaps via Deep Texture Generation Networks
    journal: CoRR
    volume: abs/2112.01807
    year: 2021
    doi: 10.48550/arXiv.2112.01807
downloads:
  - title: Unaligned Data
    description: Real RGB and virtual depth maps
    btn: unaligned.zip
    href: https://mega.nz/file/xKxRxC6L#D7QYagQzDjHWKdqzAO46lNFiW2S_wpJu6Y1HLO9hJjE
  - title: Aligned Data (Globally)
    description: Real RGB and virtual depth maps + RGB
    btn: aligned_g.zip
    href: https://mega.nz/file/ZbZAxRZL#RzB4zxJoYnAlgC1WEmRMWv1Y67drW3bbFPA1PmMFCt8
  - title: Aligned Data (Per-Object)
    description: Real RGB and virtual depth maps + RGB
    btn: aligned_po.zip
    href: https://mega.nz/file/QbYUyBpB#tE3GXRrbl1wh8Pd-kw0ib4SzoIOfmLYEwo_2I_BZpRg
  - title: Texture Maps
    description: Used to augment the training data, for Sim2Real TL
    btn: textures.zip
    href: https://mega.nz/file/xL5jyKYa#leghrMB-qdUaLYHvtlsAo-4v4PEmslPmMblmsabxj5s
  - title: 3D Printable STL & CAD Files
    description: Object set used in the experiments
    btn: object_set.zip
    href: https://mega.nz/file/VewxyQTD#AppWhGiuUFy4bBeIekexonlm-DyQ7MoP9VMri3sy4U8
date: 2021-05-28 23:55:00
---

Most current works in *Sim2Real* learning for robotic manipulation tasks leverage camera vision that may be significantly occluded by robot hands during the manipulation. Tactile sensing offers complementary information to vision and can compensate for the information loss caused by the occlusion. However, the use of tactile sensing is restricted in the *Sim2Real* research due to no simulated tactile sensors being available. To mitigate the gap, we introduce a novel approach for simulating a GelSight tactile sensor in the commonly used Gazebo simulator. Similar to the real GelSight sensor, the simulated sensor can produce high-resolution images by an optical sensor from the interaction between the touched object and an opaque soft membrane. It can indirectly sense forces, geometry, texture and other properties of the object and enables *Sim2Real* learning with tactile sensing. Preliminary experimental results have shown that the simulated sensor could generate realistic outputs similar to the ones captured by a real GelSight sensor. 

{% embed_figure image:pad samples_qualitative.jpg 'Samples collected using a GelSight 2014 sensor (top row) and the corresponding simulations: using[^2] (2nd row), the ***Single Gaussian*** (3rd row) and the ***Difference of Gaussians*** (4th row) for the elastomer heightmap approximation, for a GelSight 2017 sensor (last row). As seen in the listed tactile images, the generated samples look realistic and quite similar to the real ones, being able to replicate internal light configurations of different sensors.' %}


## ViTac workshop 

This GelSight Simulation method was firstly proposed at the [2019 ICRA ViTac Worshop](http://wordpress.csc.liv.ac.uk/smartlab/icra-2019-vitac-workshop/) and, given the  [interest shown](https://scholar.google.com/scholar?oi=bibs&hl=en&cites=1347008206220158376) by the community, now revised and extended in a new publication[^1]. For instance, the initial elastomer deformation approximation approach, generated unrealistic sharp contouring around the in-contact areas, as shown in **Figure 2**. Improvements achieved now, are shown in **Figure 3.**

{% embed_figure image:pad vitac2019workshop.jpg 'Real and synthetic tactile samples next to the corresponding experimental setup, as in the first work[^1]. experimental setup. Samples were collected using ordinary objects, and the experimental setup consisted on a GelSight 2014 installed on a UR5 robotic arm.'%}

## Method

{% embed_figure image heightmap.jpg 'Comparison of different methods for approximating elastomer deformations: without any smoothing effects (***Before Smoothing***), smoothed with a single Gaussian filter (***Single Gaussian***) and smoothed with the DoG (***Difference of Gaussians***).' %}

## Experimental Setup 
To produce the necessary real datasets, a GelSight sensor is mounted onto a Fused Deposition Modeling (FDM) 3D printer A30 from Geeetech. A set of objects with different shapes on the top is designed and 3D printed using the Form 2 Stereolithography (SLA) 3D printer. A Virtual World comprised of a FDM printer, a GelSight sensor and a set of virtual objects, is also set up. Identical real and virtual datasets are then collected.


These include the STL files for printing the 21 set of objects and support mount,
the raw real and virtual datasets, and the aligned datasets using the per-object alignment method.
Please refer to the paper for more details about the experiments.

{% embed_figure video data_collection.webm 'Identical datasets are collected both in the real world and simulation. In the real world, the raw GelSight tactile images are collected, in simulation, depth maps are collected for the offline generation of the synthetic datasets. ' %}

{% embed_figure image:pad object_set.jpg 'The used objects set: Hexagon, Dot-in, Moon, Large Sphere, Pacman, Flat Slab, Wave, Cylinder, Triangle, Random Prism, Line, Torus, Curved Surface, Dots, Cone, Small Sphere, Rectangular Prism, Side Cylinder, Open Shell, Parallel lines and Crossed Lines.' %}


## Sim2Real transfer learning 

One aspect to consider in the *Sim2Real* learning is the *Sim2Real* gap that results from characteristics of the real world being not modeled in the simulation. In our case, we find that one major difference between the real and synthetic samples are the textures introduced by the 3D printing process. To mitigate this issue, we create twelve texture maps using GIMP that resemble the textures observed in the real samples, as shown in **Figure 1**. By randomly perturbing the captured virtual depth-maps with such textures, we are able to produce an effective data augmentation scheme that significantly improves the *Sim2Real* transition, from a 43.76% classification accuracy to 76.19%, in the real data.

{% embed_figure image:pad texture_augmented.jpg 'On the top row, four of the twelve textures created to perturb the captured virtual depth-maps, to address the *Sim2Real* gap.  On the bottom row, corresponding augmented samples fed to the Neural Netwo
rk during training, after perturbing the depth-map  with the randomly distorted texture, generating the RGB tactile sample using the proposed method, and applying a random augmentation transformation.' %}

{% embed_figure youtube tr6orOcGic0 'This work has been published at RA-L and ICRA 2021[^1]. Checkout our presentation at the ICRA conference.'%}


## References
[^1]: Daniel Fernandes Gomes, Paolo Paoletti and Shan Luo, &#65282;Generation of GelSight Tactile Images for Sim2Real Learning&#65282;,  **[RA Letters](https://ieeexplore.ieee.org/abstract/document/9369877)**, **[ArXiv preprint](https://arxiv.org/abs/2101.07169)**
[^2]: Daniel Fernandes Gomes, Achu Wilson and Shan Luo, &#65282;GelSight Simulation for Sim2Real Learning&#65282;, ViTac Workshop ICRA 2019. **[paper](http://wordpress.csc.liv.ac.uk/smartlab/wp-content/uploads/sites/5/2019/06/ICRA2019ViTac_paper_8.pdf)**