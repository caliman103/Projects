#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

pthread_mutex_t mutex;

void *printer(void *number);

int main()
{

    pthread_t thread1, thread2, thread3;

    int number = 0;

    pthread_mutex_init(&mutex, NULL);

    pthread_create(&thread1, NULL, printer, (void *)&number);
    pthread_create(&thread2, NULL, printer, (void *)&number);
    pthread_create(&thread3, NULL, printer, (void *)&number);

    pthread_join(thread1, NULL);
    pthread_join(thread2, NULL);
    pthread_join(thread3, NULL);

    pthread_mutex_destroy(&mutex);

    return 0;
} // end main

void *printer(void *number)
{
    pthread_mutex_lock(&mutex);
    int *num = (int *)(number);

    for (int i = 0; i < 20; i++)
    {
        *num += 1;
        printf("%d, ", *num);
    } // end for
    pthread_mutex_unlock(&mutex);
} // end printer