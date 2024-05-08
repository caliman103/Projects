#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <pthread.h>

void *thread(void *arg){
    char *ret;
    printf("thread() entered with argument '%s'\n", arg);
    if((ret = (char*) malloc(20)) == NULL) {
        perror("malloc() error");
        exit(2);
    }
    strcpy(ret, "This is a test");
    pthread_exit(ret);
}


int main()
{
    pthread_t thread1;

    void *ret;

    if(pthread_create(&thread1, NULL, thread, "thread 1") != 0) {
        perror("pthread_create() error");
        exit(1);
    }

    if(pthread_join(thread1, &ret) != 0) {
        perror("pthread_join() error");
        exit(3);
    }
    printf("Thread exited with = '%s'\n", ret);
    
    return 0;
}
