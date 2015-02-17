#!/bin/sh

if [ $(ps -e -o uid,cmd | grep $UID | grep node | grep -v grep | wc -l | tr -s "\n") -eq 0 ]
then
        export PATH=/usr/local/bin:$PATH
       sudo forever start -c "node --harmony" --sourceDir ~/latest jutja.js >> ~/latest/log.txt 2>&1
fi
