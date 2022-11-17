#!/bin/bash
echo "Creating the volume..."

kubectl apply -f kubernetes/mongo/persistent-volume.yaml
kubectl apply -f kubernetes/mongo/persistent-volume-claim.yaml


echo "Creating the database credentials..."

kubectl apply -f kubernetes/mongo/secret.yaml


echo "Creating the mongodb deployment and service..."

kubectl create -f kubernetes/mongo/deployment.yaml
kubectl create -f kubernetes/mongo/service.yaml


echo "Creating the backend deployment and service..."

kubectl create -f kubernetes/backend/deployment.yaml
kubectl create -f kubernetes/backend/service.yaml
