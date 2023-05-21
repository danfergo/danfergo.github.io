title: Vision-guided active tactile perception for crack detection and reconstruction
author: danfergo
tags:
  - featured
  - touch
categories: []
cover: cover.gif
abstract: >-
  Vision suffers from variances in light conditions and shadows, we study
  tactile sensing, guided by vision, for crack detection
authors:
  - jiaqi
  - guan
  - danfergo
  - shan
date: 2021-06-01 00:00:01
cite_this:
---

Crack detection is of great significance for monitoring the integrity and well-being of the infrastructure such as bridges and underground pipelines, which are harsh environments for people to access. In recent years, computer vision
techniques have been applied in detecting cracks in concrete structures. However, they suffer from variances in light conditions and shadows, lacking robustness and resulting in many false positives. To address the uncertainty in vision, human inspectors actively touch the surface of the structures, guided by vision, which has not been explored in autonomous crack detection. In this paper, we propose a novel approach to detect and reconstruct cracks in concrete structures using visionguided active tactile perception. Given an RGB-D image of a structure, the rough profile of the crack in the structure surface will first be segmented with a fine-tuned Deep Convolutional
Neural Networks, and a set of contact points are generated to guide the collection of tactile images by a camera-based optical tactile sensor. When contacts are made, a pixel-wise mask of the crack can be obtained from the tactile images and therefore the profile of the crack can be refined by aligning the RGB-D image and the tactile images. Extensive experiment results have shown that the proposed method improves the effectiveness and robustness of crack detection and reconstruction significantly, compared to crack detection with vision only, and has the potential to enable robots to help humans with the inspection and repair of the concrete infrastructure.