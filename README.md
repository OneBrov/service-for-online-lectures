# service-for-online-lectures
Online service for lectures with using WebRTC (media server), React + mui + TS (client), Nestjs + MongoDB (backend))

Service layout for online lectures. With basic functions: screen capture, video and voice transmission, text messages, with the ability to create your own rooms.

The project is divided into 3 parts:

1) Client part (frontend) - React + TS + MUI

2) Server part (backend) - Nestjs server (NodeJS), for processing API requests, as well as for creating records in the database (MongoDB)

3) Open view server. Used as a WebRTS media server. This part is not presented in this repository.
You can download openvidu server here https://hub.docker.com/r/openvidu/openvidu-server-kms (for local development). You can get acquainted with openvidu here https://docs.openvidu.io/en/stable/

This work was done as part of my thesis at the institute
