pipeline{
    agent any
  
    environment {
      DOCKER_HUB_PWD = credentials('dockerHubPwd')
    }

    stages{
        stage("Main"){
            steps{
                script{
                    registry = "tomasblaha"
                    appName = "pv-web"
                    tag = "latest"

                    stage("DockerHub login"){
                        sh "docker login -u $registry -p ${DOCKER_HUB_PWD}"
                    }
                  
                    stage("Build Docker image"){
                        sh "docker build -t $registry/$appName:$tag ."
                    }

                    stage("Push Docker image"){
                        sh "docker push $registry/$appName:$tag"
                    }
                }
            }
        }
    }
    post {
        success {
            echo 'Build SUCCESS.'
        }
        always {
            deleteDir()
        }
        unstable {
            echo 'UNSTRABLE.'
        }
        failure {
            echo 'Build FAILED.'
        }
    }
}
