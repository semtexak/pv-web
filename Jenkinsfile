pipeline{
    agent any

    stages{
        stage("Main"){
            steps{
                script{
                    registry = ""
                    tag = "1"
                    appName = "pv-web"

                    stage("Build Docker image"){
                        sh "docker build -t $appName:$tag ."
                        sh "docker push $appName:$tag"
                    }

                    stage("Run Docker image"){
                        sh "docker run -p 1111:1111 $appName:$tag"
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
