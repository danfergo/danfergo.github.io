title: >-
  Skill Generalization of Tubular Object Manipulation with Tactile Sensing and
  Sim2Real Learning
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
date: 2021-12-01 00:00:01
cite_this:
---
Tubular objects such as test tubes are common in chemistry and life sciences research laboratories, and robots that can handle them have the potential to accelerate experiments. Moreover, it is expected to train a robot to manipulate tubular objects in a simulator and then deploy it in a real-world environment. However, it is still challenging for a robot to learn to handle tubular objects through single sensing and bridge the gap between simulation and reality. In this paper, we propose a novel tactile-motor policy learning method to generalize tubular object manipulation skills from simulation to reality. In particular, we propose a Sim-to-Real transferable in-hand pose estimation network that generalizes to unseen tubular objects. The network utilizes a novel adversarial domain adaptation network to narrow the pixel-level domain gap for tactile tasks by introducing the attention mechanism and a task-related constraint. The in-hand pose estimation network is further implemented in a Reinforcement Learning-based policy learning framework for robotic insert-and-pullout manipulation tasks. The proposed method is applied to a human-robot collaborative tube placing scenario and a robotic pipetting scenario. The experimental results demonstrate the generalization capability of the learned tactile-motor policy toward tubular object manipulation in research laboratories.