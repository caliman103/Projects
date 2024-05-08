#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>
#include <sys/wait.h>
void *f1();
void *f2();
void *f3();

int main() {
    pthread_t thread1, thread2;
    int id = fork();

    if(id == 0) {
        pthread_create(&thread1, NULL, f1, NULL);
        pthread_join(thread1, NULL);
        pthread_create(&thread2, NULL, f2, NULL);
        pthread_join(thread2, NULL);
    } else {
        wait(NULL);
        f3();
    }
    return 0;

}
void *f1() {
    for(int i = 10; i <= 25; i++) {
       printf("%d  ", i);
    }
}
void *f2() {
    for(int i = 26; i <= 75; i++) {
        printf("%d  ", i);
    }
}
void *f3() {
    for(int i = 76; i <= 100; i++) {
        printf("%d  ", i);
    }
}
