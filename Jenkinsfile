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
                        imageName = "israelfrank/app:lts"
                        sh "docker build -t ${imageName} ."
                        sh "docker push ${DOCKER_REGISTRY}/${imageName}"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh "kubectl apply -f deployment.yaml -n ${K8S_NAMESPACE}"
                }
            }
        }    
    } 
}
