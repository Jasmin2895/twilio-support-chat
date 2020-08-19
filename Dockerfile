#Dockerfile

# select OS image from docker hub
FROM node:current-slim

#set the working directory
WORKDIR /

# Copy the file from your host to your current location.
COPY package.json .

#copy the file from the host to current location
COPY . .

# Run the command inside your image filesystem.
RUN npm install

# Add metadata to the image to describe which port the container is listening on at runtime.
EXPOSE 3002

# Run the specified command within the container.
CMD [ "npm", "start" ]

ENTRYPOINT ["node", "server.js"]