#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

int sum1 = 0; 
int sum2 = 0;
int sum3 = 0;

void *func1();
void *func2();
void *func3();

int main() {
    pthread_t thread1, thread2, thread3;

    pthread_create(&thread1, NULL, func1, NULL);
    pthread_create(&thread2, NULL, func2, NULL);
    pthread_create(&thread3, NULL, func3, NULL);

    pthread_join(thread1, NULL);
    pthread_join(thread2, NULL);
    pthread_join(thread3, NULL);

    printf("Total is :%d\n", (sum1+sum2+sum3));
}


void *func1() {
    for(int i = 1; i <= 100; i++) {
        sum1 += i;
    }
    printf("Sum of 1 to 100 = %d\n", sum1);
}
void *func2() {
    for(int i = 101; i <= 200; i++) {
        sum2 += i;
    }
    printf("Sum of 101 to 200 = %d\n", sum2);
}
void *func3() {
    for(int i = 201; i <= 300; i++) {
        sum3 += i;
    }
    printf("Sum of 201 to 300 = %d\n", sum3);
}