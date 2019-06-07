pipeline{
    agent any
  
    stages{
        stage("Main"){
            steps{
                script{
                    appName = "pv-web"
                    tag = env.GIT_COMMIT
                  
                    stage("Clone plugin reposiotry"){
                      sh "git clone https://github.com/semtexak/pv-plugin.git plugin"
                    }

                    stage("Docker BUILD"){
                      sh "docker build -t $appName:$tag ."
                      sh "docker rmi $appName:latest || true"
                      sh "docker tag $appName:$tag $appName:latest"
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
