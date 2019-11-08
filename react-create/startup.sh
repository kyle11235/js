name=ui
port=9002
WORKSPACE=${WORKSPACE:=$PWD} 

if [ "$(sudo docker ps -aq -f name=$name)" ]; then
	# stop and run
	sudo docker stop $name && sudo docker rm $name && sudo docker run --name $name -d -p $port:80 -v $WORKSPACE/build:/usr/share/nginx/html nginx
else
	# run
	sudo docker run --name $name -d -p $port:80 -v $WORKSPACE/build:/usr/share/nginx/html nginx
fi