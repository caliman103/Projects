#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <time.h>
#include <sys/wait.h>

int main() {
    int id = fork();
    int n; //start value

    //check which process we are running
    if(id == 0) { //this is the child
        n = 1;
    } else { //this is the parent
        n = 6;
    }

    if(id != 0) {
        wait(NULL);
    }

    for(int i = n; i < n + 5; i++) {
        printf("%d ", i);
        fflush(stdout);
    }
    return 0;
}