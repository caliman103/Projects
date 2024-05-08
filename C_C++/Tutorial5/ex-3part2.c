#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <pthread.h>

void *func1();
void *func2();

int main()
{
    printf("srating\n");
    pthread_t thread1, thread2;

    void *func1result;
    void *func2result;

    //pthread_create(&thread2, NULL, func2, NULL);
    pthread_create(&thread1, NULL, func1, NULL);
    //pthread_join(thread2, &func2result);
    pthread_join(thread1, &func1result);
    
    printf("Ending\n");

    printf("func1 = %p\n", func1result);
    //printf("func2 = %p\n", func2result);
    return 0;
}

void *func1()
{
    printf("Entered func 1\n");
    int *sum;
    int num;
    num = 0;
    *sum = 0;
    printf("Please enter a number\n");
    scanf("%d", &num);
    for (int i = 1; i <= num; i++)
    {
        *sum += i;
    }
    //printf("func1 result: %d", sum);
    pthread_exit(sum);
}

void *func2()
{
    int *sum;
    int num1, num2, num3;
    num1 = num2 = num3 = 0;
    *sum = 0;
    printf("Please enter 3 numbers\n");
    scanf("%d%d%d", &num1, &num2, &num3);
    *sum = (num1 + num2 + num3);
    //printf("func2 result: %d\n", sum);
    pthread_exit(sum);
}