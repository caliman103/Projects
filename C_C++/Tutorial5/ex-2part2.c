#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

//#define MAX = 60;

int numbers[60];

void *printer1();
void *printer2();
void *printer3();



int main() {
    pthread_t thread1,thread2, thread3;

    pthread_create(&thread1, NULL, printer1, NULL);
    pthread_create(&thread2, NULL, printer2, NULL);
    pthread_create(&thread3, NULL, printer3, NULL);

    pthread_join(thread1, NULL);
    pthread_join(thread2, NULL);
    pthread_join(thread3, NULL);

    for(int i = 0; i < 60; i++) {
        printf("%d  ", numbers[i]);
    }
}

void *printer1() {
    for(int i = 0; i < 20; i++) {
        numbers[i] = i +1;
    }
}
void *printer2() {
    for(int i = 20; i < 40; i++) {
        numbers[i] = i +1;
    }
}
void *printer3() {
    for(int i = 40; i < 60; i++) {
        numbers[i] = i +1;
    }
}

