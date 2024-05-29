// Algorithms Project.cpp : This file contains the 'main' function. Program execution begins and ends there.
	/*---------------points examples-----------*/
	//vector<Point> points = { {0, 0}, {1, 1}, {2, 2}, {0, 2}, {2, 0} };
	//    /* vector<Point> points = {
	//         {1, 1}, {2, 2}, {3, 3},
	//         {2, 3}, {3, 2}, {0, 0},
	//         {1, 3}, {3, 0}
	//     };*/
	//
	//
	//     /* vector<Point> points = {
	//          {0, 0}, {2, 1}, {1, 3}
	//      , {-1, 3}, {-2, 1}
	//      };*/
	//
	//      /*  vector<Point> points = {
	//            {0, 0}, {2, 0}, {2, 2},
	//            {1, 1}, {0, 2}
	//            };*/
	//vector<Point> points = { {0, 0}, {1, 1}, {2, 2}, {0, 2}, {2, 0} };

#include <iostream>
#include "convex_hull.h"
#include"divide_and_conquer_convex_hull.h"
#include <vector>
using namespace std;





int main()
{
	vector<Point> pointsInput = {
		{0,3},{1,1},{2,2},{4,4},
		{0,0},{1,2},{3,1},{3,3}
	};

//----------	BruteForce    ------------------
	cout << "-----Brute Force--------\n";
	vector<Point>convexHullFrame = bruteForceConvexHull(pointsInput);

	printConvexHullPath(convexHullFrame);

	int n = pointsInput.size();

	cout << "Actual iterations: (" << actualIterations_BF()<<")" << " For input: (" << n << ").\n";

	/*long long complexity = bruteForceComplexity(n);
	cout << "worst case Complexity: O(" << complexity << ")" << " For input: (" << n << ").\n";*/


//----------	Divide and conquer    ------------------
	cout << "-----Divide and conquer---------\n";

	vector<Point_DC> pointsInput_DC = { {0, 3}, {1, 1}, {2, 2}, {4, 4}, {0, 0}, {1, 2}, {3, 1}, {3, 3} };
	vector<Point_DC> hullFrame_DC= convexHull_DC(pointsInput_DC);
	int n_DC = pointsInput_DC.size();

	displayConvexHull_DC(hullFrame_DC);
	cout << "Actual iterations: (" << actualIterations_DC() <<")" << " For input: (" << n_DC << ").\n";


	return 0;
}
