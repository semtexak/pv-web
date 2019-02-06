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
                    tag = env.GIT_COMMIT

                    stage("Docker BUILD"){
                      sh "docker build -t $registry/$appName:$tag ."
                      sh "docker tag $registry/$appName:$tag $registry/$appName:latest"
                    }
                    
                    stage("Docker LOGIN"){
                        sh "docker login -u $registry -p ${DOCKER_HUB_PWD}"
                    }

                    stage("Docker PUSH"){
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
            echo 'Build UNSTABLE.'
        }
        failure {
            echo 'Build FAILED.'
        }
    }
}
