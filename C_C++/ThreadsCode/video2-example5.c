#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <pthread.h>

void *test();

int main() {
    pthread_t thread1, thread2;

    if(pthread_create(&thread1, NULL, &test, NULL) != 0) {
        return 1;
    }//end if

    if(pthread_create(&thread2, NULL, &test, NULL) != 0) {
        return 2;
    }//end if
    if(pthread_join(thread1, NULL) != 0) {
        return 3;
    }//end if
    
    if(pthread_join(thread2, NULL) != 0) {
        return ;
    }//end if

    return 0;
}//end main

void *test() {
    printf("test start\n");
    sleep(3);
    printf("test end\n");
}//end test