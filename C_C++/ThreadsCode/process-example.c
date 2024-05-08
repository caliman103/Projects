#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int main() {
    int pid = fork();
    if(pid == -1) {//error occurred
        return 1;
    }

    printf("Process id: %d\n", getpid());
    if(pid != 0) {
        wait(NULL);
    }
    return 0;
}