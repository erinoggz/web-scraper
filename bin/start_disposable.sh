#!/usr/bin/env bash

# This script will start a single "disposable" instance and connect the caller to it.
# The instance will link to all infrastructure, including the service containers (if it exists)
IMAGE_NAME="nest_task_web_app"

# Unfortunately, because we are mapping our current source code over the docker images source code, we will lose
# the node_modules. Run npm install locally before we try anything else. This will install the node modules and ensure
# that it is present on the container at run time.

# 'BASH_SOURCE[0]' gives the file path e.g. './bin/start_disposable.sh'
# 'dirname' then extracts the directory of the file e.g. './bin'
# 'cd' changes the directory to that of 'bin' e.g. 'cd ./bin'
# 'pwd' extracts the path of the current working directory e.g. '/Users/admin/ratings/bin'
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# 'dirname' then extracts the directory of the project e.g. '/Users/admin/ratings/'
ROOT="$(dirname "${SCRIPT_DIR}")"

# First check if our image has been built. If not, build it.
if [[ "$(docker images -q ${IMAGE_NAME}:latest 2> /dev/null)" == "" ]]; then
    echo " ----- Web App Image Does Not Exist. Building Now. -----"
    docker build -t ${IMAGE_NAME} ${ROOT}
else
    echo " ----- Web App Image Available for Use. -----"
fi

PROJECT_NAME="nest_task"

CURRENT_DOCKER_COMPOSE_VERSION=$( docker-compose -v | grep -o '[0-9]*[.][0-9]*[.][0-9]' | sed -e 's/[.]//g' )
BREAKING_DOCKER_COMPOSE_VERSION=1210

# Since docker compose version: '1.21.0', the network setup automatically adds a single '_' to the network_name_prefix,
# while version '1.20.0' and below replaces any extra ‘_’ at the end of the network_name_prefix with a single '_'.
# This assumes that at versions below '1.20.0' e.g. '1.9.0', no ‘_’ is added at the end of the network_name_prefix.
if [[ ${CURRENT_DOCKER_COMPOSE_VERSION} -lt ${BREAKING_DOCKER_COMPOSE_VERSION} ]]; then
 PROJECT_NAME="${PROJECT_NAME}_"
fi

echo " ----- Network name prefix is: ${PROJECT_NAME} -----"

echo " ----- Starting Up Infrastructure Containers -----"

docker-compose -p ${PROJECT_NAME} up -d

# Now, depending on whether our services are running or not, link them into our disposable container.
# NB: This file is hardcoded based on settings in the composer files and the env file.
echo " ----- Run Web application Disposable Container -----"
docker run \
    -i \
    -t \
    -p 3000 \
    -p 3000 \
    -v ${ROOT}:/src \
    --env-file=${ROOT}/.env \
    --network=nest_task_main_network \
    ${IMAGE_NAME} \
    bash

echo " ----- EXITED from disposable container -----"
echo " ----- Removing Exited Containers. -----"

# Now grep through all containers and stop those that have been "exited". Only do that for our service.
docker ps -a | grep Exited | awk '{ print $1,$2 }' | \
grep ${IMAGE_NAME} |  awk '{print $1 }' | xargs -I {} docker rm {}
