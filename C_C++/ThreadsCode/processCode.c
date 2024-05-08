#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int main() {
    int x = 2;
    int pid = fork();
    if(pid == -1) {//error occurred
        return 1;
    }

    if(pid != 0) {
        x++;
    }
    sleep(2);
    printf("Value of x: %d\n", x);
    if(pid == 0) {
        wait(NULL);
    }
    return 0;
}