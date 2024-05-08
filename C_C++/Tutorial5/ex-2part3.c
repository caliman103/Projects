#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

//#define MAX = 60;

int numbers[60];

void *printer(void *starter);



int main() {
    pthread_t thread1,thread2, thread3;

    int thread1Start = 0;
    int thread2Start = 20;
    int thread3Start = 40;


    pthread_create(&thread1, NULL, printer, (void *) &thread1Start);
    pthread_create(&thread2, NULL, printer, (void *) &thread2Start);
    pthread_create(&thread3, NULL, printer, (void *) &thread3Start);

    pthread_join(thread1, NULL);
    pthread_join(thread2, NULL);
    pthread_join(thread3, NULL);

    for(int i = 0; i < 60; i++) {
        printf("%d  ", numbers[i]);
    }
}

void *printer(void* starter) {
    int *start = (int*) (starter);
    for(int i = *start; i < (*start + 20); i++) {
        numbers[i] = i +1;
    }
}
