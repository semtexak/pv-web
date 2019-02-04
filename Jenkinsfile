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
                    tag = sh(returnStdout: true, script: "git tag --sort version:refname | tail -1").trim()
                    echo tag

                    stage("DockerHub login"){
                        sh "docker login -u $registry -p ${DOCKER_HUB_PWD}"
                    }
                  
                    stage("Build Docker image"){
                        sh "docker build -t $registry/$appName:${env.BUILD_ID} ."
                    }

                    stage("Push Docker image"){
                        sh "docker push $registry/$appName:${env.BUILD_ID}"
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
