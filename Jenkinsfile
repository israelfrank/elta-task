def imageName

pipeline {
    agent any
    environment {
        DOCKER_REGISTRY = 'docker.io'
        K8S_NAMESPACE = 'webapp'
    }

    stages {
        stage('Build and Push Docker Image') {
            steps {
                // Build and tag the Docker image
                script {
                    withCredentials([usernamePassword(credentialsId: 'Docker_Hub', usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                        sh "docker login -u ${DOCKER_HUB_USERNAME} -p ${DOCKER_HUB_PASSWORD}"
                        imageTag = new Date().format("yyyyMMdd-HHmmss")
                        imageName = "israelfrank/webapp:${imageTag}"
                        sh "docker build -t ${imageName} ."
                        sh "docker push ${DOCKER_REGISTRY}/${imageName}"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh """
                       sed -i 's|image: israelfrank/webapp:.*|image: ${imageName}|' app-kube/app-deployment.yml
                    """
                    sh "kubectl apply -f deployment.yml -n ${K8S_NAMESPACE}"
                }
            }
        }    
    } 
}
