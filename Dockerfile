# Use the predefined node base image for this module.
FROM node:latest

# create the log directory
RUN mkdir -p /var/log/applications/nest_task

# Creating base "src" directory where the source repo will reside in our container.
# Code is copied from the host machine to this "src" folder in the container as a last step.
RUN mkdir /src
WORKDIR /src
COPY . /src


# Install node dependencies
RUN yarn

RUN yarn build


# Map a volume for the log files and add a volume to override the code
VOLUME ["/src", "/var/log/applications/nest_task"]

# Expose web service and nodejs debug port
EXPOSE  3000
EXPOSE  3000

CMD ["node", "dist/main.js"]
