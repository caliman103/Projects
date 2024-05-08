#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <pthread.h>

pthread_mutex_t mutex;
int func2result = 0;
pthread_t thread1, thread2;

void *func1();
void *func2();
void *delegator(void *thread);

int main() {
    pthread_mutex_init(&mutex, NULL);
    
    int t2 = 1;
    int t1 = 2;

    pthread_create(&thread2, NULL, delegator, (void *) &t2);
    pthread_create(&thread1, NULL, delegator, (void *) &t1);

    pthread_join(thread2, NULL);
    pthread_join(thread1, NULL);

    pthread_mutex_destroy(&mutex);
}

void *delegator(void *thread) {
    pthread_mutex_lock(&mutex);
    int *t = (int*) (thread);
    if(*t == 2) {
        pthread_create(&thread2, NULL, func2, NULL);
        pthread_join(thread2, NULL);
    }  else {
        pthread_create(&thread1, NULL, func1, NULL);
        pthread_join(thread1, NULL);
    }
    pthread_mutex_unlock(&mutex);
}

void *func1()
{
    pthread_mutex_lock(&mutex);
    int num, sum;
    num = sum = 0;
    float quotient = 0.0;
    printf("Please enter a number\n");
    scanf("%d", &num);
    for (int i = 1; i <= num; i++)
    {
        sum += i;
    }
    printf("Sum: %d\n", sum);
    if(func2result == 0) func2result = 1;
    quotient = (float)sum / (float)func2result;
    printf("Quotient %.2f\n", quotient);
    pthread_mutex_unlock(&mutex);
}

void *func2()
{
    pthread_mutex_lock(&mutex);
    int num1, num2, num3;
    num1 = num2 = num3 = 0;
    printf("Please enter 3 numbers\n");
    scanf("%d%d%d", &num1, &num2, &num3);
    func2result = (num1 + num2 + num3);
    printf("%d + %d + %d = %d\n", num1, num2, num3, func2result);
    pthread_mutex_unlock(&mutex);
}