/**
 * Jamaine Drakes
 * 400005037
*/
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <time.h>
#include <sys/wait.h>

void func1() {
    int n = 0;
    int sum = 0;
    do{
        printf("Enter a number between 5 and 15\n");
        scanf("%d", &n);
    } while (n < 5 || n > 15);


    for (int i = 1;i < n; i++) {
         sum += (i*i);
    }
    printf("Sum of squares from 1 to %d is %d\n", n, sum);   
}

void func2() {
    int num1, num2, num3, sum;
    num1 = num2 = num3 = sum = 0;
    do{
        printf("Please enter 3 numbers between 5 and 20\n");
        scanf("%d%d%d", &num1, &num2, &num3);
    } while((num1 < 5 || num1 > 20) || (num2 < 5 || num2 > 20) || (num3 < 5 || num3 > 20));
    sum = (num1 * num2 * num3);
    printf("The product of %d, %d and %d is %d\n", num1, num2, num3, sum);
}

int main() {
    int id = fork();
    if(id == 0) {
        func1();
    } else {
        wait(NULL);
        func2();
    }
}
