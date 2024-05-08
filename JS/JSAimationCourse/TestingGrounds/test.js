/* 
for (int col = 0; col < tree2Width; col++)
{
    for (int row = 0; row < tree2Height; row++)
    {
        int red = tree2->read(col, row, 1);
        int green = tree2->read(col, row, 2);
        int blue = tree2->read(col, row, 3);

        if (tree2->read(col, row) != 0)
        {
            MyCanvas->plot((tree2XPos + col), (tree2YPos + row), red, green, blue);
        }//end if
    }//end for
}//end for
*/