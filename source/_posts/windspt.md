title: 'WindsPT: An e-Science Platform for Wind Measurement Campaigns'
author: danfergo
tags:
  - featured
categories: []
cover: cover.gif
authors: 
  - danfergo
  - jcl
  - jlp
  - etc
abstract: >-
  We developed an e-science platform that enables the planning and execution of
  experimental campaigns, and the dissemination of the collected wind
  measurements.
cite_this:
  - citation_id: Gomes_2022
    citation_type: article
    title: WindsPT e-Science platform for wind measurement campaigns
    author: D F Gomes and J C Lopes and J M L M Palma and F Senra and S Dias and I L Coimbra
    doi: 10.1088/1742-6596/2265/2/022081
    journal: 'Journal of Physics: Conference Series'
    year: 2022
    month: may
    publisher: IOP Publishing
    volume: 2265
    number: 2
date: 2018-12-30 14:41:00
---
Experimental field campaigns for collecting wind data are essential for academic research and the wind energy industry, but challenging to organize due to the complex equipment and infrastructure required. Existing e-Science platforms have been developed for more generic domains, which prevents them from capturing the details and requirements of the field. In this project we have developed WindsPT: an e-Science platform for planning, executing, and disseminating wind measurement campaign data. Additionally, we propose a decentralized protocol for transferring large volumes of data from the in-site devices to our platform, ensuring data replication. With an easy-to-use Web interface, WindsPT promotes collaboration between participants, disseminates results among the stakeholders, publishes metadata, uses DOI, and includes metadata that enables machine-to-machine communication.

The platform development started with the Perdigão 2017[^1] campaign and the need of gathering partners collaboration intentions for the campaign planning, as well as producing a reference platform for gathering all the campaign related information (planning documents, datasets, publications, etc). A two-phase questionnaire was developed and made available to the representatives of each institution that would be participating in the campaign. The questionnaire results became the starting point for in-depth discussions among institution representatives, campaign managers, and the development team, with the goal of establishing a common vocabulary amongst all involved parties. Particularly, data curators pruned, and improved with additional metadata, the categories of equipment and the equipment, that was collaboratively added to the platform through the surveys. This became the publicly available equipment catalog. Other discussions revolved around the definition of a measurement station and how to model it in the platform. With that, campaign managers geo-registered in the platform the planned measurement stations. 
{% embed_figure youtube pCLIAfrVCR4 '' %}

The campaign profile fulfils the second function of the platform --- to host all information related to the campaign. Here, users can find all information related to the campaign: planning and dissemination documents, gathered datasets, measurement equipment and stations (including their geo-registration and operating timelines), participants (visiting timeline and profile) and a logbook that can be used to register all relevant events.

WindsPT was built with an Angular frontend and NodeJS/ExpressJS backend that exposes a REST api. Relational data is stored on a PostgresSQL database, and the Sequelize ORM is used for handling database queries. To store the planning and dissemination documents, MongoDB GridFS is used under the ExpressJS backend. Given the potentially huge (and unbounded) size of the datasets, a decentralized protocol has been established between data producer institutions, that consists on using Linux rsync protocol periodically between peers of the pool, ensuring the data is replicated across all, while minimising data transfer between nodes. In one of these nodes (ours), a THREDDS Data Server (TDS) gathers files and folders reorganises them in catalogues, and makes them available through different protocols (HTTP, OpeNDAP OGC WMS, etc). The WindsPT backend then re-exposes this catalogued data through its rest api to create the corresponding graphical user interface. This allows us to add additional features such as the capability to download "folders" as zip files, and make the interface similar to the "Documents" interface. 


{% embed_figure image stations.jpg 'The stations page, in the campaign profile. A top view map of the campaign area shows the stations grouped by category and sub category. When selecting one station, an auto-generated diagram further illustrates what the station would look like, given the planning information. ' %}

The WindsPT platform  as proved to be a valuable tool during all the phases of the Perdigão 2017 large field experiment. Following that, a multi-campaign version of WindsPT[^2] platform has been designed to host multiple campaigns on multiple research projects. The advantage of such multi-campaign platform, is that, this way, information about equipment and researchers can be shared across campaigns. Full-text search capabilities, have been added enabling users to find any information across the entire pool of campaigns with just one search query.

## References
[^1]: Perdigão 2017 Field Campaign. [https://perdigao.fe.up.pt](https://perdigao.fe.up.pt)
[^2]: Windscanner.PT multi-campaign platform. [https://windscannerpt.fe.up.pt](https://windscannerpt.fe.up.pt)


