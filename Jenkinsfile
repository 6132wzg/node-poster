pipeline {
  agent any
  options {
    timeout(time: 1, unit: 'HOURS')
    buildDiscarder(logRotator(numToKeepStr: '5'))
    disableConcurrentBuilds()
  }
  stages {
    stage('Info') {
      steps {
        sh 'id'
        sh 'uname -a'
        sh 'tree -du -L 4'
      }
    }
    stage('Build') {
      /** master 分支不参与自动构建 */
      when {
        expression { BRANCH_NAME ==~ /(dev|feat|test|fix|hotfix|master).*/}
      }
      steps {
        sh 'make build'
      }
    }
    stage('to=dev') {
      when {
        expression { BRANCH_NAME ==~ /(dev|feat|test|fix|hotfix|master).*/}
      }
      steps {
        sh 'make rsync to=saas-dev'
        sh 'make release to=saas-dev'
      }
    }
    stage('to=koudaifit1') {
      when {
        expression { BRANCH_NAME ==~ /master/}
      }
      steps {
        sh 'make rsync to=koudaifit1'
        sh 'make release to=koudaifit1'
      }
    }
  }
  post {
    always {
      // 始终删除构建过程中产出的文件
      sh 'make clean'
      echo "http://shs.dev.styd.cn/"
    }
  }
}
