title: Clevo P65xRP / Inphtech P600-G on Linux
author: danfergo
tags:
  - linux
categories: []
date: 2016-10-17 01:00:00
---
This is going to be a very atypical post on this blog but, because I spent almost two weeks to figure it out I’ll leave it here. These configs will probably change with time and so, I’ll be updating this post in a logbook manner.

{% asset_img clevo-linux.jpg "Antergos Gnome on my Clevo P65x" %}

#### 16th october 2016

I’m running Antergos with Gnome desktop environment and 4.7.6-1-ARCH kernel on UEFI, gpt/lvm partitioning and systemd-boot loader.

1. **Headphone jack:** when I closed the lead, suspended or hibernated the computer the headphone jack would stop working. I found that a lot of people already had this issue and init-headphone package was the solution. You may find it here. https://github.com/Unrud/init-headphone (for arch available at AUR)
2. **Keyboard backlight:** this was the most obvious and although there was already a driver for clevo/linux, I didn’t found any compatible with the P65x. Fortunately in this repo i was able to find an request/issue suggesting the updates needed to make it compatible with this laptop model. Which worked! A few days latter the developer integrated the changes and now are available by default https://bitbucket.org/lynthium/clevo-xsm-wmi (for arch available at AUR)
3. **Touchpad:** this was the trickiest one and the main reason why I’ve decided to create this post. After large hours (days) of testing I found this post on askubuntu http://askubuntu.com/questions/525629/touchpad-is-not-recognized which solved the problem. Basically it is related to the i8042 chipset and its (mis)configuration. By passing those flags to the kernel, It will ignore those configs and just turn It on. The Fn+F1 doesn’t work still though; I’ll probably investigate that latter.


If you have any problems/suggestions, please leave comment below.

Good luck.

{% raw %}
<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/236927412&amp;color=000000&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
{% endraw %}