/**
 * Jamaine Drakes
 * 400005037
*/
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <time.h>
#include <pthread.h>
#include <sys/wait.h>

int Storage[5];
pthread_mutex_t mutex;
void *func1(){
    pthread_mutex_lock(&mutex);
    for(int i = 0; i < 5; i++){
        Storage[i] = (rand() % 80) + 20;
    }
    for(int i = 0; i < 5; i++){
        printf("%d ", Storage[i]);
    }
    printf("\n");
    printf("Thread 1 from child exiting with id %lu\n", pthread_self());
    pthread_mutex_unlock(&mutex);
}

void *func2() {
    int max = -1;
    int min = 99999;
    for(int i = 0; i < 5; i++){
        Storage[i] += 6;
    }
    for(int i = 0; i < 5; i++){
        printf("%d ", Storage[i]);
    }
    printf("\n");
    for(int i = 0; i < 5; i++) {
        if(Storage[i] < min) {
            min = Storage[i];
        }
        if(Storage[i] > max) {
            max = Storage[i];
        }
    }
    printf("Smallest value = %d\nLargest value = %d\n", min, max);
    printf("Thread 2 from child exiting with id %lu\n", pthread_self());
}

void *func3() {
    printf("Thread printing from parent process id = %lu\n", pthread_self());
}


int main() {
    srand(time(0));
    pthread_t thread1, thread2, thread3;
    pthread_mutex_init(&mutex, NULL);
    int id = fork();
    if(id == 0) {
        pthread_create(&thread1, NULL, func1, NULL);
        pthread_create(&thread2, NULL, func2, NULL);
        pthread_join(thread1, NULL);
        pthread_join(thread2, NULL);
    
    } else {
        wait(NULL);
        pthread_create(&thread3, NULL, func3, NULL);
        pthread_join(thread3, NULL);
        printf("Parent completed\n");
    }
    pthread_mutex_destroy(&mutex);

}