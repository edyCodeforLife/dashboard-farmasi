
**HOW TO RUN**

* with docker
	* install your docker engine in your device
	* move to this project root
	* create network for communicate between application container with command `docker network create "local" -d bridge`
	* please be note, when you try to change network name to another name from **"local"** to another name, you probably should change the network in `docker-compose.yml`
	* create and run application as docker image with command `docker-compose up --build`

* with direct npm
	* make sure you were installed the node js and your node js should version 12.21.0 because this project has initiate with that node version
	* move to this project root
	* run command `npm install`
	* run command `npm start`
