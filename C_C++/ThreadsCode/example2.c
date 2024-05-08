#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

void *computation(void* add);

int main() {
    
    pthread_t thread1;
    pthread_t thread2;

    long value1 = 1;
    long value2 = 2;

    pthread_create(&thread1, NULL, computation, (void*) &value1);
    pthread_create(&thread2, NULL, computation, (void*) &value2);

    pthread_join(thread1, NULL);
    pthread_join(thread2, NULL);
}//end main

void *computation(void* add) {
    long *addNum = (long *) (add);
    printf("Add: %ld\n", *addNum);
    return NULL;
}//end computation
