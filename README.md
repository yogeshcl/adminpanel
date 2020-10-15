
#Hashme admin 


#building docker image
docker build -t yogeshcl/angular-app .
docker images
docker run -d -it -p 80:80/tcp --name angular-app
yogeshcl/angular-app:latest