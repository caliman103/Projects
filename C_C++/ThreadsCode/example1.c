#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

void *computation(void* add);

int main() {
    
    pthread_t thread1;

    char value1 = 'a';

    pthread_create(&thread1, NULL, computation, (void*) &value1);

    pthread_join(thread1, NULL);
}//end main

void *computation(void* add) {
    char *addNum = (char *) (add);
    printf("Add: %c", *addNum);
    return NULL;
}//end computation

