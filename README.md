# hello-nodejs-kubernetes
It is a sample of nodejs with kubernetes.  
I will show how to make a kubenetes infra struction and start the first application based on node.js.  
Also, it also contains how to scale up or down and show the status in Dashboard.  

## build hello-nodejs  
$ docker build -t hello-nodejs:v1 .  

## check the built image  
$ docker images  

## check the operation  
$ curl -i localhost:8080   

## tagging  
$ docker tag hello-nodejs:v1 994942771862.dkr.ecr.eu-west-2.amazonaws.com/repository-hello-nodejs  

## image push  
$ docker push 994942771862.dkr.ecr.eu-west-2.amazonaws.com/repository-ksdyb  

## deplay and create service for hello-nodejs  
$ kubectl create -f k8s/hello-nodejs.yaml  

## check the external ip or domain  
$ kubectl get service -o wide  
NAME           TYPE           CLUSTER-IP     EXTERNAL-IP                                                               PORT(S)          AGE   SELECTOR  
hello-nodejs   LoadBalancer   10.100.71.97   a74430335892d11e9bc290ab61396c5b-1565267968.eu-west-1.elb.amazonaws.com   8080:32604/TCP   61s   run=hello-nodejs  
kubernetes     ClusterIP      10.100.0.1     <none>                                                                    443/TCP          27h   <none>  

## check the operation  
$ curl -i http://a74430335892d11e9bc290ab61396c5b-1565267968.eu-west-1.elb.amazonaws.com:8080  

## If scale-up is required, use this command  
$ kubectl get pods
NAME                            READY   STATUS    RESTARTS   AGE  
hello-nodejs-66f54786bb-wmxbw   1/1     Running   0          10m  

$ kubectl scale deployment hello-nodejs --replicas=3  
deployment.extensions/hello-nodejs scaled  

$ kubectl get nodes  
NAME                                          STATUS   ROLES    AGE     VERSION  
ip-172-31-20-131.eu-west-1.compute.internal   Ready    <none>   6h54m   v1.12.7  
ip-172-31-20-235.eu-west-1.compute.internal   Ready    <none>   6h54m   v1.12.7  
ip-172-31-30-134.eu-west-1.compute.internal   Ready    <none>   6h54m   v1.12.7  
ip-172-31-30-142.eu-west-1.compute.internal   Ready    <none>   6h54m   v1.12.7  

## install the packages for dashboard  
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v1.10.1/src/deploy/recommended/kubernetes-dashboard.yaml  

$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/heapster/master/deploy/kube-config/influxdb/heapster.yaml  

$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/heapster/master/deploy/kube-config/influxdb/influxdb.yaml  

$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/heapster/master/deploy/kube-config/rbac/heapster-rbac.yaml  

$ kubectl apply -f k8s/eks-admin-service-account.yaml  

## check the token  
$ kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep eks-admin | awk '{print $1}')  

## start kube proxy  
$ kubectl proxy  

## open dashboard in a browser  
http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/#!/login  
