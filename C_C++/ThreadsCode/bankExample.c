#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>

int balance = 0;
pthread_mutex_t mutex;

int getBalance();
void setBalance(int newbalance);
void *deposit(void* amount);

int main(){
    printf("Before: %d\n",getBalance());

    pthread_t thread1, thread2;

    pthread_mutex_init(&mutex, NULL);

    int deposit1, deposit2;

    deposit1 = 200;
    deposit2 = 300;

    pthread_create(&thread1, NULL, deposit, (void*) &deposit1);
    pthread_create(&thread2, NULL, deposit, (void*) &deposit2);

    pthread_join(thread1, NULL);
    pthread_join(thread2, NULL);

    pthread_mutex_destroy(&mutex);

    printf("After: %d",getBalance());

    return 0;
}//end main

int getBalance() {
    sleep(1);
    return balance;
}//end getBalance

void setBalance(int new_Balance){
    sleep(1);
    balance = new_Balance;
}//end setBalance

void *deposit(void* amount) {
    //create a lock
    pthread_mutex_lock(&mutex);
    
    int account_balance = getBalance();
    account_balance += *((int*) amount);
    setBalance(account_balance);

    //release lock
    pthread_mutex_unlock(&mutex);

}