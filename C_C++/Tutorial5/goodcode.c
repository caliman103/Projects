#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include <pthread.h>

int sum= 0;
int num= 1;
int userNum = 0; 
int userSum = 0; 
int num1; 
int num2; 
int num3; 


//mutex variable 
pthread_mutex_t mutex; 


void *func1();
void *func2(); 




int main(){
    pthread_t thread1;
    pthread_t thread2;

    pthread_create(&thread1, NULL, func1, NULL); 
    pthread_create(&thread2, NULL, func2, NULL); 

    pthread_join(thread2, NULL);
    pthread_join(thread1, NULL); 

    pthread_mutex_destroy(&mutex); 
    return 0;
}




void *func1() {
    pthread_mutex_lock(&mutex); 
    //ask user to enter number and sum it from 1 to n 

    //get user input 
    printf("\nType a number" );

    //save the number 
    scanf("%d", &userNum); 

    for (int i= 1; i <= userNum; i++) {
        sum+=i; 
    }
    
    printf("\nsum of func1 %d", sum);
    printf("\ndivision %d", sum/userSum); 
    pthread_mutex_unlock(&mutex); 
    
}

void *func2() {
    pthread_mutex_lock(&mutex); 
    //ask user to enter 3 numbers and then sum them
    printf("\nEnter 3 numbers:" );
    scanf("%d %d %d",&num1,&num2, &num3);
    userSum = num1 + num2 +num3; 
    printf("\nSum for func2 %d",userSum); 
    pthread_mutex_unlock(&mutex);
}