title: 'GarmNet: Improving Global with Local Perception for Robotic Laundry Folding'
author: danfergo
tags:
  - featured
  - vision
categories: []
cover: cover.gif
abstract: >-
  We propose a novel end-to-end deep learning model named GarmNet that is able
  to simultaneously localize the garment and detect landmarks for grasping.
authors:
  - danfergo
  - shan
  - lft
date: 2019-03-02 22:29:00
---
Developing autonomous assistants to help with domestic tasks is a vital topic in robotics research. Among these tasks, garment folding is one of them that is still far from being achieved mainly due to the large number of possible configurations that a crumpled piece of clothing may exhibit. Research has been done on either estimating the pose of the garment as a whole or detecting the landmarks for grasping separately. However, such works constrain the capability of the robots to perceive the states of the garment by limiting the representations for one single task. In this work, we propose a novel end-to-end deep learning model named GarmNet that is able to simultaneously localize the garment and detect landmarks for grasping. The localization of the garment represents the global information for recognising the category of the garment, whereas the detection of landmarks can facilitate sub-sequent grasping actions. We train and evaluate our proposed GarmNet model using the CloPeMa Garment dataset that contains 3,330 images of different garment types in different poses. The experiments show that the inclusion of landmark detection (GarmNet-B) can largely improve the garment localization, with an error rate of 24.7% lower. Approaches as ours are important for robotics applications, as these offer scalable to many classes, memory and processing efficient solutions.

So, why study this problem? The central motivation lies in automating the folding of clothing items, an activity that is present throughout our society and either consumes our personal time or is reflected in the cost of services or products we purchase. Any system we can imagine for automating this task will undoubtedly require a clothing recognition module, which is the focus of this research.
Furthermore, when considering clothing recognition in isolation, it becomes evident that this capability is not only useful for folding clothes but also for other systems. For example, intelligent surveillance systems may want to locate a person in a video feed based on their clothing description, or e-commerce recommendation systems may need to provide suggestions based solely on information available in a photograph. By developing a reliable and efficient model for clothing recognition, we aim to contribute to the advancement of these technologies and improve their performance in various applications.


{% embed_figure image:pad problem.jpg "Spatial Constraint" %}


{%raw%}
<!--
## Background
Traditional Convolutional neural networks (CNNs) can be broken down into two main blocks: Convolutional layers, that have the goal of iteratively and hierarchically extract descriptive features from the raw image; followed by Linear (or fully connected) layers, weigh such features into a final prediction.
When examining previous works on object detection, the first and most influential is the R-CNN series, which inspired the design of our model. The R-CNN series has been improved over three papers. In the first one, the core idea of the model is defined, with the help of traditional machine learning models. In the subsequent papers, new operations and components are introduced, enabling the entire model to be viewed as a convolutional network.
A notable component is the Region Proposal Network (RPN), introduced in the third paper, Faster R-CNN. For each position in the last activation map of a set of convolutional operations, the RPN makes a set of binary predictions (classification and localization) that serve as proposals for the next stage of the model.
Another key component is the Region of Interest (RoI) pooling operation, which extracts and resizes positive proposals made by the RPN to a fixed size. These proposals are then classified in the subsequent stages of the model, and the bounding box parameters are adjusted accordingly. These innovations have greatly contributed to the development of more efficient and accurate object detection models, providing the foundation for our clothing recognition system.
However, the R-CNN model has a significant computational inefficiency due to the classification and regression being performed in two steps.
This problem is addressed in the YOLO model, which uses two outputs. The first output determines a large set of bounding boxes, each associated with a confidence score. The second output calculates a conditional probability for each cell in a predefined grid. If a positive bounding box exists for a cell, the object is considered to belong to the predicted class.
By streamlining the process and performing object detection in a single step, the YOLO model significantly improves computational efficiency while maintaining high accuracy. This approach has influenced the design of our clothing recognition model, allowing it to effectively analyze images and deliver accurate results in a more efficient manner.
Another work, specifically focused on clothing item recognition, is DeepFashion. This model not only uses the image itself but also incorporates meta-information to determine the keypoints of interest (without considering the class) of the clothing item, its class, and additional attributes related to the type of clothing, material, and context of use.
DeepFashion is similar to the R-CNN model in that it has intermediate proposals without considering their specific class. However, in this model, these proposals are used to feed a final component that doesn't classify them but instead determines the class and attributes of the clothing item.
Additionally, this model includes a third branch used to determine global features of the image. By combining these approaches, DeepFashion achieves a more comprehensive understanding of clothing items in images, allowing it to accurately recognize and process various types of garments and their associated attributes.
-->
{%endraw%}

## Method 

Given an image containing a clothing item in a semi-crumpled or semi-folded pose, we aim to develop a system capable of classifying and localizing the clothing item with a bounding box. Additionally, the system should be able to detect and classify each associated keypoint of interest on the clothing item, such as the outer lower corner of the right leg or the position between the legs. By tackling this problem, we hope to create a robust solution that can be integrated into various applications, ultimately improving their efficiency and effectiveness in recognizing and processing clothing items.


Our model was initially inspired by the R-CNN architecture. However, after undergoing several modifications, it has also come to resemble other models such as YOLO and DeepFashion. Similar to YOLO, our model performs object detection in a single step. It shares some aspects with DeepFashion by using keypoint predictions to enhance the overall image feature prediction, ultimately improving the classification of the object. Our model also has its unique characteristics, such as incorporating an extra class for background segmentation. We can break down the model into three primary modules: Feature Extraction, and two additional branches. One branch is responsible for determining the class and bounding box of the clothing item, while the other branch focuses on identifying the keypoints of interest. This combination of elements allows our model to efficiently analyze images and deliver accurate results. 

**The feature extractor** in our model is implemented using a 50-layer ResNet, which has been pre-trained on datasets provided by the ImageNet platform. From this model, we have chosen two output points. The first one produces a 14x14 volume, which we use as input for the keypoint detection module. The second output point generates a vector with 2048 features, which we use as input for the clothing item localization and classification module. The set of features computed between the first and second output points can be interpreted as global features of the image. This allows our model to effectively analyze the overall structure and content of the image, contributing to its accuracy and efficiency in detecting objects and keypoints.


**The clothing item localization and classification** module consists of an intermediate dense operation and two outputs. One output performs the bounding box regression for the clothing item, while the other predicts the clothing item's class, encoded in a one-hot format. The regression output is trained using the mean squared error loss function, while the classification output is trained using the cross-entropy loss function, applied in conjunction with the softmax activation.

**The keypoint detector can be interpreted** as applying a small localizer for each spatial position of the feature extractor's output volume, implemented with convolutional operations. In other words, the intermediate layer has a 3x3 filter and 1024 activation maps, which is equivalent to applying a dense operation with an output vector of 1024 features. Subsequently, we apply the dense operation to each of these feature vectors using a convolutional operation with a 1x1 filter. This approach enables our model to effectively detect keypoints of interest on the clothing items within the image.




## Experiments

{%raw%}
<!-- 
Accuracy is the percentage of correct predictions. When considering accuracy for object localization the IoU is also considered i.e., must be higher than 50%.
mean Average Precision is (related to) the area under the precision-recall curve. The curve is defined by computing the precision and recall each rank level. A confidence value for each proposal is required, to sort the proposals. IoU of 50% is also applied.

Baseline.
-->
{%endraw%}



We train each branch of the model separately during 40 iterations, batch size of 30 and Adadelta optimizer. The Garment localizer achieves: 100% accuracy on classification and 43% classification+localization. The Landmark detector achieves: 37.8% mAP.



{%raw%}
<!-- 
Firstly, we wanted to take advantage of the fact that there is only one class of keypoints of interest per image. In other words, if we can use cross-entropy loss along the depth dimension because, given the softmax activation, these features follow a probabilistic distribution, we can also assume that there is a spatial probabilistic distribution if we apply softmax spatially as well. With this approach, we aimed to reduce the space of possible solutions. However, the mean Average Precision (mAP) dropped from 37.8% to 35.7%. This result indicates that while the proposed method aimed to improve the model's performance, it did not produce the desired outcome. Further experimentation and modifications may be needed to achieve better results in detecting and recognizing clothing items and their associated keypoints.
In a second experiment, we introduced the features of the activation maps from the last layer of the keypoints detector into the module for localization and classification of the clothing items' keypoints. This was achieved by flattening the output volume of the keypoints detector and concatenating the resulting vector with the output vector from the intermediate dense operation of the clothing item localizer. As a consequence, the classification and localization accuracy improved significantly from 43% to 82%. This result demonstrates that incorporating the keypoints detector's activation maps into the localization and classification module can greatly enhance the model's performance in identifying and locating clothing items and their associated keypoints.
-->
{%endraw%}

{% embed_figure image:pad img_spacial_constraint.png "Spatial Constraint" %}

## Conclusions
We have shown a possible way to perform landmark detection together with garment localization, based on a object detection approach. We should notice, though, the fact that for some landmark classes the AP is 0% i.e., no predictions are made. This, together with the fact that many hyper-parameters can be tweaked and the dataset is not very large, hints  to the fact that better results could be obtained. To attempt to tackle more complex problems, different from simple classification and/or regression, it is important to understand each type of module, and the gradient descent dynamics. When implementing custom losses or layers,  the vectorial paradigm is always present. Better tools for the development of such systems can be envisioned, that would contribute to quicker design and implementation iterations. Instead of attempting to extract all the landmarks and garment class+localization in one step, other approaches should be considered. For instance, given an image what’s the best point to grasp? Or, how much folded is the present garment piece?

## References
[^1]: GarmNet: Improving Global with Local Perception for Robotic Laundry Folding, TAROS 2019, **[arxiv]([https://arxiv.org/abs/1907.00408])**
[^2]: Detecting garment and its landmarks MSc dissertation, 2017-07-18. **[UP Open Repository](https://hdl.handle.net/10216/107701)**