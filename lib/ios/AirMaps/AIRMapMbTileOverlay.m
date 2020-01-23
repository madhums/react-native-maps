//
//  AIRMapMbTileOverlay.m
//  Pods-AirMapsExplorer
//
//  Created by Christoph Lambio on 28/03/2018
//  Based on AIRMapLocalTileOverlay.m
//  Copyright (c) by Peter Zavadsky.
//

#import "AIRMapMbTileOverlay.h"
#import "FMDatabase.h"

@interface AIRMapMbTileOverlay ()
@end

@implementation AIRMapMbTileOverlay

-(void)loadTileAtPath:(MKTileOverlayPath)path result:(void (^)(NSData *, NSError *))result {
    NSFileManager *fileManager = [NSFileManager defaultManager];
    if ([fileManager fileExistsAtPath:self.URLTemplate]) {
        FMDatabase *db = [FMDatabase databaseWithPath:self.URLTemplate];
        [db open];

        // MBTiles spec says the files should be in TMS spec.
        // But Apple, Google maps and OSM use xyz.
        // So convert TMS to xyz
        // Read more: https://gist.github.com/tmcw/4954720
        double y = pow(2, path.z) - path.y - 1;

        FMResultSet *databaseResult = [db executeQuery:@"SELECT tile_data FROM tiles WHERE zoom_level = ? AND tile_column = ? AND tile_row = ?;", @(path.z), @(path.x), @(y)];

        while ([databaseResult next]) {
            NSData *tile = [databaseResult dataForColumn:@"tile_data"];
            result(tile,nil);
        }
        [db close];
    } else {
        NSLog(@"Database not found. Wrong path.");
    }
}

@end
