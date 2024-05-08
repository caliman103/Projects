#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

pthread_mutex_t mutex;
int sum = 0;

void *adder(void* number);

int main() {
    int number = 0;

    pthread_t thread1, thread2, thread3;

    //intialise mutex
    pthread_mutex_init(&mutex, NULL);

    pthread_create(&thread1, NULL, adder, (void *) &number);
    pthread_create(&thread2, NULL, adder, (void *) &number);
    pthread_create(&thread3, NULL, adder, (void *) &number);

    pthread_join(thread1, NULL);
    pthread_join(thread2, NULL);
    pthread_join(thread3, NULL);

    pthread_mutex_destroy(&mutex);

    return 0;
}//end main

void *adder(void* number) {
    //Create lock
    pthread_mutex_lock(&mutex);
    int *num = (int*) (number);
    for(int i = 0; i < 100; i++) {
        *num += 1;
        sum += *num;
    }//end for
    printf("Sum :%d\n", sum);
    
    //unlock
    pthread_mutex_unlock(&mutex);
    return NULL;
}//end adder