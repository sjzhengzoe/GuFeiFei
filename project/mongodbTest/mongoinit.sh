#!/bin/bash
sudo curl -O https://fastdl.mongodb.org/osx/mongodb-osx-ssl-x86_64-4.0.9.tgz
sudo tar -zxvf mongodb-osx-ssl-x86_64-4.0.9.tgz
sudo mv mongodb-osx-x86_64-4.0.9/ mongodb 
mkdir data
mkdir log
export PATH=./mongodb/bin:$PATH                                  
mongod --dbpath ./data --logpath ./log/mongo.log --fork                    
echo "init success"