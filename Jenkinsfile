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
                    tag = "1"
                    appName = "pv-web"

                    stage("Build Docker image"){
                        sh "docker login -u $registry -p ${DOCKER_HUB_PWD}"
                        sh "docker build -t $registry/$appName:$tag ."
                    }

                    stage("Push Docker image"){
                        sh "docker push $registry/$appName:$tag"
                    }

                    stage("Run Docker image"){
                        sh "docker stop $appName || true && docker rm $appName || true" 
                        sh "docker run -p 1111:1111 $registry/$appName:$tag"
                    }
                }
            }
        }
    }
    post {
        success {
            echo 'OK :)'
        }
        always {
            echo 'One way or another, I have finished'
            deleteDir()
        }
        unstable {
            echo 'I am unstable :/'
        }
        failure {
            echo 'I failed :('
        }
    }
}
