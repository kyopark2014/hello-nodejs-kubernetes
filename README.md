# Hello-Nginx-Kubernetes
It is a sample of nginx using kubernetes.
Also, helm is used for deplolyment.

- build hello-nginx
$ docker build -t hello-nginx:v1 .
$ docker images
- local test
$ docker run -d --name hello-nginx  -p 8080:8080 hello-nginx:v1  
$ curl localhost:8080

- install helm
$ kubectl create -f k8s/rbac-config.yaml
$ helm init --service-account tiller
$ helm create chart-hello-nginx

- edit chart-hello-nginx/value.yaml
. # of replica
  replicaCount: 3
. repository
  repository: 994942771862.dkr.ecr.eu-west-2.amazonaws.com/repository-nginx
  tag: latest  
. service type for exposition
  type: LoadBalancer

$ helm lint chart-hello-nginx
$ helm package chart-hello-nginx
$ helm inspect chart-hello-nginx
$ helm install chart-hello-nginx --name hello

• Troubleshoot: If there is an error to run it, use these commends.
$ kubectl create serviceaccount --namespace kube-system tiller
$ kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
$kubectl patch deploy --namespace kube-system tiller-deploy -p '{"spec":{"template":{"spec":{"serviceAccount":"tiller"}}}}'      
$ helm init --service-account tiller --upgrade

- check the operation
$ kubectl get services
NAME                      TYPE           CLUSTER-IP       EXTERNAL-IP                                                               PORT(S)          AGE
hello-chart-hello-nginx   LoadBalancer   10.100.6.103     a59ab49439bd011e9a5580a2ce4b1bdd-1160858148.eu-west-2.elb.amazonaws.com   80:30505/TCP     114s
kubernetes                ClusterIP      10.100.0.1       <none>                                                                    443/TCP          2d23h

$ curl -i a59ab49439bd011e9a5580a2ce4b1bdd-1160858148.eu-west-2.elb.amazonaws.com
HTTP/1.1 200 OK
Server: nginx/1.17.0
Date: Mon, 01 Jul 2019 07:21:58 GMT
Content-Type: text/html
Content-Length: 28
Last-Modified: Mon, 01 Jul 2019 06:10:32 GMT
Connection: keep-alive
ETag: "5d19a3d8-1c"
Accept-Ranges: bytes

<h1>Hello Kubernetes</h1> 


