#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <pthread.h>

void *test(void* num);

int main() {
    int x = 2;
    pthread_t thread1, thread2;

    if(pthread_create(&thread1, NULL, &test, (void *) &x) != 0) {
        return 1;
    }//end if

    if(pthread_create(&thread2, NULL, &test, (void *) &x) != 0) {
        return 2;
    }//end if
    if(pthread_join(thread1, NULL) != 0) {
        return 3;
    }//end if
    
    if(pthread_join(thread2, NULL) != 0) {
        return 4;
    }//end if

    return 0;
}//end main

void *test(void* num) {
    int *number = ((int*) num);
    *number += 1;
    printf("Number : %d\n",*number);
    // printf("Value of number is :%d\n", *number);
}//end test